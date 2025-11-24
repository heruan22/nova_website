'use client';

import { useState, useEffect } from 'react';

interface Port {
  id: string;
  name: string;
  type: 'loading' | 'unloading';
}

interface Cargo {
  id: string;
  name: string;
  loadingPort: string;
  unloadingPort: string;
  weight: number;
  price: number;
}

interface CostParams {
  portFees: number;
  dailyRent: number;
  sailingDays: number;
  anchorageDays: number;
  sailingFuelConsumption: number;
  anchorageFuelConsumption: number;
  fuelPrice: number;
}

interface CalculationResult {
  totalRevenue: number;
  portFees: number;
  rentCost: number;
  fuelCost: number;
  totalCost: number;
  profit: number;
  profitRate: number;
}

export default function ProfitCalculator() {
  const [ports, setPorts] = useState<Port[]>([
    { id: '1', name: '', type: 'loading' },
    { id: '2', name: '', type: 'unloading' },
  ]);
  const [cargos, setCargos] = useState<Cargo[]>([
    { id: '1', name: '', loadingPort: '', unloadingPort: '', weight: 0, price: 0 },
  ]);
  const [costParams, setCostParams] = useState<CostParams>({
    portFees: 0,
    dailyRent: 0,
    sailingDays: 0,
    anchorageDays: 0,
    sailingFuelConsumption: 0,
    anchorageFuelConsumption: 0,
    fuelPrice: 0,
  });

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem('shipProfitCalculator');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.ports) setPorts(data.ports);
        if (data.cargos) setCargos(data.cargos);
        if (data.costParams) setCostParams(data.costParams);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // 自动保存数据
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('shipProfitCalculator', JSON.stringify({ ports, cargos, costParams }));
    };
    const timer = setTimeout(saveData, 500);
    return () => clearTimeout(timer);
  }, [ports, cargos, costParams]);

  // 添加港口
  const addPort = (type: 'loading' | 'unloading') => {
    setPorts([...ports, { id: Date.now().toString(), name: '', type }]);
  };

  // 删除港口
  const removePort = (id: string) => {
    setPorts(ports.filter(p => p.id !== id));
  };

  // 更新港口
  const updatePort = (id: string, name: string) => {
    setPorts(ports.map(p => (p.id === id ? { ...p, name } : p)));
  };

  // 添加货物
  const addCargo = () => {
    setCargos([...cargos, { id: Date.now().toString(), name: '', loadingPort: '', unloadingPort: '', weight: 0, price: 0 }]);
  };

  // 删除货物
  const removeCargo = (id: string) => {
    setCargos(cargos.filter(c => c.id !== id));
  };

  // 更新货物
  const updateCargo = (id: string, field: keyof Cargo, value: any) => {
    setCargos(cargos.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // 计算结果
  const calculate = (): CalculationResult => {
    const totalRevenue = cargos.reduce((sum, c) => sum + c.weight * c.price, 0);
    const rentCost = costParams.dailyRent * (costParams.sailingDays + costParams.anchorageDays);
    const fuelCost =
      (costParams.sailingFuelConsumption * costParams.sailingDays +
        costParams.anchorageFuelConsumption * costParams.anchorageDays) *
      costParams.fuelPrice;
    const totalCost = costParams.portFees + rentCost + fuelCost;
    const profit = totalRevenue - totalCost;
    const profitRate = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      portFees: costParams.portFees,
      rentCost,
      fuelCost,
      totalCost,
      profit,
      profitRate,
    };
  };

  const result = calculate();

  // 重置所有数据
  const resetAll = () => {
    if (confirm('确定要重置所有数据吗？')) {
      setPorts([
        { id: '1', name: '', type: 'loading' },
        { id: '2', name: '', type: 'unloading' },
      ]);
      setCargos([{ id: '1', name: '', loadingPort: '', unloadingPort: '', weight: 0, price: 0 }]);
      setCostParams({
        portFees: 0,
        dailyRent: 0,
        sailingDays: 0,
        anchorageDays: 0,
        sailingFuelConsumption: 0,
        anchorageFuelConsumption: 0,
        fuelPrice: 0,
      });
      localStorage.removeItem('shipProfitCalculator');
    }
  };

  // 导出报告
  const exportReport = () => {
    const reportContent = `
杂货船利润计算报告
生成时间: ${new Date().toLocaleString('zh-CN')}

=== 港口信息 ===
装货港: ${ports.filter(p => p.type === 'loading').map(p => p.name).join(', ')}
卸货港: ${ports.filter(p => p.type === 'unloading').map(p => p.name).join(', ')}

=== 成本参数 ===
港使费: ¥${result.portFees.toLocaleString()}
日租金: ¥${costParams.dailyRent.toLocaleString()}
航行天数: ${costParams.sailingDays} 天
锚泊天数: ${costParams.anchorageDays} 天
航行油耗: ${costParams.sailingFuelConsumption} 吨/天
锚泊油耗: ${costParams.anchorageFuelConsumption} 吨/天
燃油价格: ¥${costParams.fuelPrice.toLocaleString()}/吨

=== 货物信息 ===
${cargos.map((c, i) => `${i + 1}. ${c.name || '未命名'} | ${c.loadingPort} → ${c.unloadingPort} | ${c.weight}吨 @ ¥${c.price}/吨`).join('\n')}

=== 计算结果 ===
总运费: ¥${result.totalRevenue.toLocaleString()}
租金成本: ¥${result.rentCost.toLocaleString()}
燃油成本: ¥${result.fuelCost.toLocaleString()}
总成本: ¥${result.totalCost.toLocaleString()}
总利润: ¥${result.profit.toLocaleString()}
利润率: ${result.profitRate.toFixed(2)}%
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `杂货船利润计算_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadingPorts = ports.filter(p => p.type === 'loading');
  const unloadingPorts = ports.filter(p => p.type === 'unloading');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 标题栏 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">杂货船利润计算器</h1>
          <p className="text-gray-600">多港口、多票货物航运利润精准计算工具</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 左侧：基础信息和成本参数 */}
          <div className="space-y-6">
            {/* 港口信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">港口信息</h2>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">装货港</label>
                  <button
                    onClick={() => addPort('loading')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + 添加装货港
                  </button>
                </div>
                {loadingPorts.map(port => (
                  <div key={port.id} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={port.name}
                      onChange={e => updatePort(port.id, e.target.value)}
                      placeholder="港口名称"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {loadingPorts.length > 1 && (
                      <button
                        onClick={() => removePort(port.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        删除
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">卸货港</label>
                  <button
                    onClick={() => addPort('unloading')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + 添加卸货港
                  </button>
                </div>
                {unloadingPorts.map(port => (
                  <div key={port.id} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={port.name}
                      onChange={e => updatePort(port.id, e.target.value)}
                      placeholder="港口名称"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {unloadingPorts.length > 1 && (
                      <button
                        onClick={() => removePort(port.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        删除
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 成本参数 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">成本参数</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">港使费（元）</label>
                  <input
                    type="number"
                    value={costParams.portFees || ''}
                    onChange={e => setCostParams({ ...costParams, portFees: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日租金（元/天）</label>
                  <input
                    type="number"
                    value={costParams.dailyRent || ''}
                    onChange={e => setCostParams({ ...costParams, dailyRent: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">航行天数（天）</label>
                  <input
                    type="number"
                    value={costParams.sailingDays || ''}
                    onChange={e => setCostParams({ ...costParams, sailingDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">锚泊天数（天）</label>
                  <input
                    type="number"
                    value={costParams.anchorageDays || ''}
                    onChange={e => setCostParams({ ...costParams, anchorageDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">航行油耗（吨/天）</label>
                  <input
                    type="number"
                    step="0.1"
                    value={costParams.sailingFuelConsumption || ''}
                    onChange={e => setCostParams({ ...costParams, sailingFuelConsumption: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">锚泊油耗（吨/天）</label>
                  <input
                    type="number"
                    step="0.1"
                    value={costParams.anchorageFuelConsumption || ''}
                    onChange={e => setCostParams({ ...costParams, anchorageFuelConsumption: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">燃油价格（元/吨）</label>
                  <input
                    type="number"
                    value={costParams.fuelPrice || ''}
                    onChange={e => setCostParams({ ...costParams, fuelPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：货物信息 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">货物信息</h2>
              <button
                onClick={addCargo}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                + 添加货物
              </button>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {cargos.map((cargo, index) => (
                <div key={cargo.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">货物 #{index + 1}</span>
                    {cargos.length > 1 && (
                      <button
                        onClick={() => removeCargo(cargo.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        删除
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">货物名称</label>
                      <input
                        type="text"
                        value={cargo.name}
                        onChange={e => updateCargo(cargo.id, 'name', e.target.value)}
                        placeholder="例如：钢材、煤炭"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">装货港</label>
                        <select
                          value={cargo.loadingPort}
                          onChange={e => updateCargo(cargo.id, 'loadingPort', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">请选择</option>
                          {loadingPorts.map(p => (
                            <option key={p.id} value={p.name}>
                              {p.name || '未命名港口'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">卸货港</label>
                        <select
                          value={cargo.unloadingPort}
                          onChange={e => updateCargo(cargo.id, 'unloadingPort', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">请选择</option>
                          {unloadingPorts.map(p => (
                            <option key={p.id} value={p.name}>
                              {p.name || '未命名港口'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">计费吨（吨）</label>
                        <input
                          type="number"
                          value={cargo.weight || ''}
                          onChange={e => updateCargo(cargo.id, 'weight', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">单价（元/吨）</label>
                        <input
                          type="number"
                          value={cargo.price || ''}
                          onChange={e => updateCargo(cargo.id, 'price', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      小计运费: ¥{(cargo.weight * cargo.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">计算结果</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">总运费</div>
              <div className="text-2xl font-bold text-blue-900">¥{result.totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-600 mb-1">总成本</div>
              <div className="text-2xl font-bold text-orange-900">¥{result.totalCost.toLocaleString()}</div>
            </div>
            <div className={`p-4 rounded-lg ${result.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-sm mb-1 ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>总利润</div>
              <div className={`text-2xl font-bold ${result.profit >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                ¥{result.profit.toLocaleString()}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${result.profitRate >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-sm mb-1 ${result.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>利润率</div>
              <div className={`text-2xl font-bold ${result.profitRate >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                {result.profitRate.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">成本明细</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">港使费</div>
                <div className="text-lg font-semibold text-gray-900">¥{result.portFees.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">租金成本</div>
                <div className="text-lg font-semibold text-gray-900">¥{result.rentCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">燃油成本</div>
                <div className="text-lg font-semibold text-gray-900">¥{result.fuelCost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-4">
          <button
            onClick={resetAll}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            重置所有数据
          </button>
          <button
            onClick={exportReport}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            导出计算结果
          </button>
        </div>
      </div>
    </div>
  );
}
