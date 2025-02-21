import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Metadata } from 'next';
import React from 'react'
import Vehicles from "@/data/mock/Fleet.json"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const metadata: Metadata = {
  title: "Mogistic | Fleet",
  description: "View Mogistic fleet",
};

const truckBrands = [
  "Ford",
  "Chevrolet",
  "Ram",
  "Toyota",
  "GMC",
  "Nissan",
  "Honda"
];

const years = Array.from(
  { length: 2025 - 1990 + 1 },
  (_, i) => 2025 - i
);

const mileageRanges = [
  "0",
  "10000",
  "25000",
  "50000",
  "75000",
  "100000",
  "150000",
  "200000+"
];

const Fleet = () => {
  return (
    <div className="container mx-auto">
      <div className=" w-full flex lg:flex-nowrap gap-5">
        <Card className='w-[450px]  border-none shadow-none'>
          <div className='w-full border sticky top-20 border-gray-300 rounded-sm'>
            <div className="w-full max-w-2xl p-3 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {truckBrands.map(brand => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearMin">Year (Min)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Min year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearMax">Year (Max)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Max year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileageMin">Mileage (Min)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Min mileage" />
                    </SelectTrigger>
                    <SelectContent>
                      {mileageRanges.map(mileage => (
                        <SelectItem key={mileage} value={mileage}>
                          {mileage.includes('+') ? mileage : `${parseInt(mileage).toLocaleString()} miles`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileageMax">Mileage (Max)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Max mileage" />
                    </SelectTrigger>
                    <SelectContent>
                      {mileageRanges.map(mileage => (
                        <SelectItem key={mileage} value={mileage}>
                          {mileage.includes('+') ? mileage : `${parseInt(mileage).toLocaleString()} miles`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </Card>
        <div className='w-full'>
          {Vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="flex rounded-sm mb-5">
              <CardHeader className="p-0">
                <Image
                  src={vehicle.image}
                  alt={vehicle.model}
                  width={300}
                  height={300}
                  className="h-[235px] w-[335px] object-cover rounded-l-sm"
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Year: {vehicle.year}</p>
                    <p>Mileage: {vehicle.mileage}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/fleet/${vehicle.id}`}>
                  <Button className="w-full">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fleet
