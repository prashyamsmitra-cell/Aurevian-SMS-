import React from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
} from 'recharts'
import { useApp } from '../../context/AppContext'

export function usePalette() {
  const { theme } = useApp()
  const dark = theme === 'dark'
  return {
    dark,
    grid: dark ? '#332F28' : '#E4DDC9',
    axis: dark ? '#AFA184' : '#8C8069',
    line: dark ? '#EFE9DA' : '#1C1A16',
    brass: '#9C7A3C',
    brassSoft: '#CBAA62',
  }
}

function ChartTooltip({ active, payload, label }: any) {
  const { theme } = useApp()
  const dark = theme === 'dark'
  if (!active || !payload?.length) return null
  return (
    <div className={`text-xs px-3 py-2 rounded-sm shadow-lift border border-white/5 ${dark ? 'bg-stone-900/95 text-stone-100' : 'bg-charcoal text-ivory'}`}>
      <p className={`mb-1 ${dark ? 'text-stone-500' : 'text-stone-400'}`}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-medium">{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export function TrendArea({ data, dataKey = 'value', xKey = 'label', height = 220 }: { data: any[]; dataKey?: string; xKey?: string; height?: number }) {
  const p = usePalette()
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="brassFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9C7A3C" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#9C7A3C" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={p.grid} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: p.axis }} axisLine={{ stroke: p.grid }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: p.axis }} axisLine={false} tickLine={false} width={34} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: p.axis, strokeDasharray: '3 3' }} />
        <Area type="monotone" dataKey={dataKey} stroke="#9C7A3C" strokeWidth={2.25} fill="url(#brassFill)" animationDuration={900} animationEasing="ease-out" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrendLine({ data, dataKey = 'value', xKey = 'label', height = 220 }: { data: any[]; dataKey?: string; xKey?: string; height?: number }) {
  const p = usePalette()
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.line} stopOpacity={0.18} />
            <stop offset="100%" stopColor={p.line} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={p.grid} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: p.axis }} axisLine={{ stroke: p.grid }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: p.axis }} axisLine={false} tickLine={false} width={34} domain={[0, 100]} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: p.axis, strokeDasharray: '3 3' }} />
        <Line type="monotone" dataKey={dataKey} stroke={p.line} strokeWidth={2.25} dot={{ r: 3, fill: '#9C7A3C', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#9C7A3C', stroke: p.axis, strokeWidth: 1 }} animationDuration={900} animationEasing="ease-out" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CompareBars({ data, bars, xKey = 'label', height = 240 }: { data: any[]; bars: { key: string; color: string; name: string }[]; xKey?: string; height?: number }) {
  const p = usePalette()
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barGap={6}>
        <defs>
          {bars.map((b) => (
            <linearGradient key={b.key} id={`barFill-${b.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={b.color} stopOpacity={0.92} />
              <stop offset="100%" stopColor={b.color} stopOpacity={0.55} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={p.grid} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: p.axis }} axisLine={{ stroke: p.grid }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: p.axis }} axisLine={false} tickLine={false} width={34} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: p.grid, opacity: 0.2 }} />
        {bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.name} fill={`url(#barFill-${b.key})`} radius={[3, 3, 0, 0]} maxBarSize={26} animationDuration={900} animationEasing="ease-out" />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SplitPie({ data, height = 200 }: { data: { name: string; value: number; color: string }[]; height?: number }) {
  const p = usePalette()
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={78} paddingAngle={3} stroke="none" animationDuration={900} animationEasing="ease-out">
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}