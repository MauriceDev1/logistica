import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const UserSettings = () => {
  return (
    <Card className="w-full h-full rounded-sm">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <Separator className='bg-gray-300'/>
    </Card>
  )
}

export default UserSettings
