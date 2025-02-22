"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React, { useState } from 'react';
import Vehicles from '@/data/mock/Fleet.json';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Search } from 'lucide-react';

// Define the Vehicle interface to match your data structure
interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number; // Changed from string to number
  price: number;
  mileage: number;
  image: string;
  condition?: string; // Added optional condition property
}

interface Filters {
  brand: string;
  yearMin: string;
  yearMax: string;
  mileageMin: string;
  mileageMax: string;
  condition: string;
}

const truckBrands = ["Ford", "Chevrolet", "Ram", "Toyota", "GMC", "Nissan", "Honda", "Man"];
const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 2025 - i);
const mileageRanges = ["0", "10000", "25000", "50000", "75000", "100000", "150000", "2000000"];
const conditions = ["new", "used"];

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;  // Keep as number
    price: number;
    mileage: number;
    image: string;
    condition?: string;
  }

const VehicleFilter = () => {
    const [filters, setFilters] = useState<Filters>({
      brand: '',
      yearMin: '',
      yearMax: '',
      mileageMin: '',
      mileageMax: '',
      condition: '',
    });

    const handleFilterChange = (field: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const filteredVehicles = Vehicles.map(v => ({
          ...v,
          year: Number(v.year)
        })).filter((vehicle) => {
          return (
            (!filters.brand || vehicle.make.toLowerCase() === filters.brand.toLowerCase()) &&
            (!filters.yearMin || vehicle.year >= Number(filters.yearMin)) &&
            (!filters.yearMax || vehicle.year <= Number(filters.yearMax)) &&
            (!filters.mileageMin || vehicle.mileage >= Number(filters.mileageMin)) &&
            (!filters.mileageMax || vehicle.mileage <= Number(filters.mileageMax)) &&
            (!filters.condition || vehicle.condition === filters.condition)
          );
        });
        setFilteredVehicles(filteredVehicles);
    };

    // Transform the data when setting initial state
    const transformedVehicles = Vehicles.map(v => ({
        ...v,
        year: Number(v.year)  // Convert year from string to number
    }));

    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(transformedVehicles);

    return (
      <div className="w-full flex lg:flex-nowrap gap-5">
        <Card className="w-[450px] border-none shadow-none">
          <div className="w-full border sticky top-20 border-gray-300 rounded-sm p-3 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select onValueChange={(value) => handleFilterChange("brand", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {truckBrands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select onValueChange={(value) => handleFilterChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearMin">Year (Min)</Label>
                <Select onValueChange={(value) => handleFilterChange("yearMin", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Min year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearMax">Year (Max)</Label>
                <Select onValueChange={(value) => handleFilterChange("yearMax", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mileage Filters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileageMin">Min Mileage</Label>
                <Select onValueChange={(value) => handleFilterChange("mileageMin", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Min mileage" />
                  </SelectTrigger>
                  <SelectContent>
                    {mileageRanges.map((mileage) => (
                      <SelectItem key={mileage} value={mileage}>
                        {mileage} km
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileageMax">Max Mileage</Label>
                <Select onValueChange={(value) => handleFilterChange("mileageMax", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max mileage" />
                  </SelectTrigger>
                  <SelectContent>
                    {mileageRanges.map((mileage) => (
                      <SelectItem key={mileage} value={mileage}>
                        {mileage} km
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-customBlue hover:bg-customBlueHover" onClick={handleSubmit}>
              <Search /> Search
            </Button>
          </div>
        </Card>
        {filteredVehicles.length < 0
          ?
            <div className='w-full h-[600px] flex bg-red-500'>
              <div className='m-auto'>
                <p>
                  There are no vehicles available
                </p>
              </div>
            </div>
          :
            <div className="w-full">
              {filteredVehicles.map((vehicle) => (
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
                      <h3 className="text-xl font-bold">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Year: {vehicle.year}</p>
                        <p>Mileage: {vehicle.mileage} km</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 relative">
                    <Link href={`/fleet/${vehicle.id}`}>
                      <Button className="w-[150px] bg-customBlue hover:bg-customBlueHover absolute bottom-3 right-3"><BookOpen /> Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

        }
      </div>
    );
}

export default VehicleFilter;
