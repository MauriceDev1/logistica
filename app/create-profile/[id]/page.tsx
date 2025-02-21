"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation';

const countryCodes = ["+1", "+27", "+44", "+91", "+61"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  first_name: z.string().min(1, "First name is required"),
  second_name: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  id_number: z.string().length(13, "ID number must be 13 digits"),
  gender: z.string(),
  date_of_birth: z.string(),
  home_country_code: z.string().min(1, "Select a country code"),
  home_phone: z.string().min(7, "Enter a valid phone number"),
  cell_country_code: z.string().min(1, "Select a country code"),
  cell_phone: z.string().min(7, "Enter a valid phone number"),
  address: z.string().optional(),
  profile_image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const extractGender = (idNumber: string): string => {
  if (idNumber.length >= 7) {
    const genderDigit = parseInt(idNumber[6], 10);
    return genderDigit >= 5 ? "Male" : "Female";
  }
  return "";
};

const extractDOB = (idNumber: string): string => {
  if (idNumber.length >= 6) {
    const year = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);
    const fullYear = parseInt(year, 10) > 22 ? `19${year}` : `20${year}`;
    return `${fullYear}-${month}-${day}`;
  }
  return "";
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      first_name: "",
      second_name: "",
      surname: "",
      id_number: "",
      gender: "",
      date_of_birth: "",
      home_country_code: "",
      home_phone: "",
      cell_country_code: "",
      cell_phone: "",
      address: "",
      profile_image: null,
    },
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const params = useParams();

  const idNumber = watch("id_number");

  React.useEffect(() => {
    if (idNumber.length === 13) {
      setValue("gender", extractGender(idNumber));
      setValue("date_of_birth", extractDOB(idNumber));
    }
  }, [idNumber, setValue]);

  const onSubmit = async (data: FormData) => {
    const supabase = await createClient();
    try {
      setLoading(true)

      const userData = {
        id: params.id, // This links the profile to the auth user
        title: data.title,
        first_name: data.first_name,
        second_name: data.second_name,
        surname: data.surname,
        id_number: data.id_number,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        home_phone_country_code: data.home_country_code,
        home_phone: data.home_phone,
        cell_phone_country_code: data.cell_country_code,
        cell_phone: data.cell_phone,
        address: data.address,
        updated_at: new Date().toISOString(),
      }

      // Insert the data into the users table
      const { error } = await supabase
        .from('users')
        .upsert(userData, {
          onConflict: 'id',
          ignoreDuplicates: false,
        })

      if (error) throw error

      // Success notification
      alert('Profile updated successfully!')
      // You might want to redirect here
      router.push('/login')

    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Select onValueChange={(value) => setValue("title", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                {["Mr.", "Mrs.", "Miss.", "Dr.", "Prof.", "Rev."].map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register("first_name")} />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="second_name">Second Name</Label>
              <Input id="second_name" {...register("second_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" {...register("surname")} />
              {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_number">ID Number</Label>
            <Input id="id_number" {...register("id_number")} />
            {errors.id_number && <p className="text-red-500 text-sm">{errors.id_number.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" disabled {...register("gender")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input id="date_of_birth" type="date" disabled {...register("date_of_birth")} />
            </div>
          </div>


          {/* Home Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Home Country Code</Label>
              <Select onValueChange={(value) => setValue("home_country_code", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((code) => (
                    <SelectItem key={code} value={code}>{code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Home Phone</Label>
              <Input {...register("home_phone")} />
              {errors.home_phone && <p className="text-red-500 text-sm">{errors.home_phone.message}</p>}
            </div>
          </div>

          {/* Cell Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cell Country Code</Label>
              <Select onValueChange={(value) => setValue("cell_country_code", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((code) => (
                    <SelectItem key={code} value={code}>{code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cell Phone</Label>
              <Input {...register("cell_phone")} />
              {errors.cell_phone && <p className="text-red-500 text-sm">{errors.cell_phone.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input {...register("address")} />
          </div>

          <Button type="submit" className="w-full">
            {loading
              ?
                <div>Loading...</div>
              :
                'Submit'
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
