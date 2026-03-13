import { Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Leaves() {
  return (
    <div className="space-y-8 animate-slide-in">
      {/* Page Header */}
      <Card className="relative overflow-hidden border-0 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 z-0" />
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Calendar size={28} className="text-white" />
            </div>
            <CardTitle className="text-4xl">
              Leave Management
            </CardTitle>
          </div>
          <CardDescription className="ml-14">
            Manage employee leave requests and track time off
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Coming Soon Card */}
      <Card className="shadow-xl">
        <CardContent className="p-16 text-center flex flex-col items-center justify-center">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-full mb-6">
            <Calendar size={64} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl mb-3">
            Coming Soon
          </CardTitle>
          <CardDescription className="max-w-md mb-8">
            Leave management features are under development. Soon you'll be able to manage leave requests, track balances, and approve time off.
          </CardDescription>
          <div className="flex gap-4">
            <Button size="lg" className="shadow-lg">
              <Plus size={20} />
              Request Leave
            </Button>
            <Button variant="outline" size="lg">
              View Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-green-600" />
            </div>
            <CardTitle className="text-lg mb-2">
              Leave Requests
            </CardTitle>
            <CardDescription className="text-sm">
              Submit and track leave requests with approval workflow
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-emerald-600" />
            </div>
            <CardTitle className="text-lg mb-2">
              Leave Balance
            </CardTitle>
            <CardDescription className="text-sm">
              View available leave balance and accrual history
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-teal-600" />
            </div>
            <CardTitle className="text-lg mb-2">
              Team Calendar
            </CardTitle>
            <CardDescription className="text-sm">
              See who's out and plan team schedules effectively
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
