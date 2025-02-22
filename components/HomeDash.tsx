import React from 'react'

const HomeDash = () => {
  const metrics = [
    { value: 75, label: "Success" },
    { value: 82, label: "Active" },
    { value: 91, label: "Growth" },
    { value: 68, label: "Revenue" }
  ];

  // Calculate strokeDashoffset based on percentage
  // Full circle circumference = 2 * π * radius = 2 * π * 70 ≈ 439.6
  const calculateOffset = (percent: number) => {
    const circumference = 2 * Math.PI * 70; // 439.6
    return circumference * (1 - percent / 100);
  };

  return (
    <div className='w-full py-5 gap-y-4 md:gap-4 flex flex-wrap md:flex-nowrap'>
      {metrics.map((metric, index) => (
        <div key={index} className='w-full md:w-1/4 h-44 flex relative bg-gray-100 rounded border border-gray-300'>
          <svg width="130" height="130" viewBox="0 0 160 160" className='m-auto' style={{ transform: "rotate(-90deg)" }}>
            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" strokeWidth="12"></circle>
            <circle
              r="70"
              cx="80"
              cy="80"
              fill="transparent"
              stroke="#61CAE9"
              strokeLinecap="round"
              strokeWidth="12"
              strokeDasharray="439.6"
              strokeDashoffset={calculateOffset(metric.value)}>
            </circle>
            <g transform="rotate(90 80 80)">
              <text
                x="80"
                y="75"
                textAnchor="middle"
                className="text-2xl font-bold"
                fill="#333333"
              >
                {metric.value}%
              </text>
              <text
                x="80"
                y="95"
                textAnchor="middle"
                className="text-sm"
                fill="#666666"
              >
                {metric.label}
              </text>
            </g>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default HomeDash
