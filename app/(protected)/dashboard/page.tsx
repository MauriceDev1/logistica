import { Card, CardContent } from '@/components/ui/card'
import { Activity, ArrowUp, CreditCard, Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">

        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium tracking-tight">Total Revenue</div>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium tracking-tight">Subscriptions</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium tracking-tight">Sales</div>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium tracking-tight">Active Now</div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2">

      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  )
}

export default Dashboard
