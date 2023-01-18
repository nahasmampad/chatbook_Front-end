import React from 'react'
import { PieChart , Pie, Tooltip, ResponsiveContainer} from 'recharts'
const Chart = ({posts,users}) => {

    const data = [
        {
            name: 'users', value: users
        },
        {
            name: 'posts', value: posts
        }
    ]
    return (
        <div>
            
            
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="40%"
                        outerRadius={120 }
                        fill="#1876F2"
                        label
                    />
                    <Tooltip />
                </PieChart>
                
           
        </div>
    )
}

export default Chart