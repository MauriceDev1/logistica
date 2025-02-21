'use client';

import { createClient } from '@/lib/supabase/client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ProfileType {
  title : string;
  first_name: string;
  second_name: string;
  surname: string;
  gender: string;
  date_of_birth: string;
  id_number: string;
  home_phone_country_code: string;
  home_phone: string;
  cell_phone_country_code: string;
  cell_phone: string;
  address: string;
}

const Profile = () => {
    const [profileData, setProfileData] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
            }

            setProfileData(data);
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
          <Card className="w-full h-full rounded-sm">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <Separator className='bg-gray-300' />
            <CardContent className="space-y-6 w-1/2 mt-5 animate-pulse">
                <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <div className="h-5 w-16 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-300 rounded" />
                    <div className="h-10 bg-gray-300 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-gray-300 rounded" />
                        <div className="flex gap-2">
                            <div className="h-10 w-20 bg-gray-300 rounded" />
                            <div className="h-10 flex-1 bg-gray-300 rounded" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-gray-300 rounded" />
                        <div className="flex gap-2">
                            <div className="h-10 w-20 bg-gray-300 rounded" />
                            <div className="h-10 flex-1 bg-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-300 rounded" />
                    <div className="h-10 bg-gray-300 rounded" />
                </div>
            </CardContent>
          </Card>
        );
    }

    if (!profileData) {
        return <div>Error loading profile</div>;
    }

    return (
        <Card className="w-full h-full rounded-sm">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <Separator className='bg-gray-300' />
            <CardContent className="space-y-6 w-1/2 mt-5">
                <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Select defaultValue={profileData.title}>
                            <SelectTrigger disabled={true} className='border border-gray-500'>
                                <SelectValue>{profileData.title}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Mr.">Mr.</SelectItem>
                                <SelectItem value="Mrs.">Mrs.</SelectItem>
                                <SelectItem value="Ms.">Ms.</SelectItem>
                                <SelectItem value="Dr.">Dr.</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-3 space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input id="first_name" defaultValue={profileData.first_name} className='border border-gray-500' disabled={true} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="second_name">Second Name</Label>
                        <Input id="second_name" defaultValue={profileData.second_name} className='border border-gray-500' disabled={true} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="surname">Surname</Label>
                        <Input id="surname" defaultValue={profileData.surname} className='border border-gray-500' disabled={true} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select defaultValue={profileData.gender}>
                            <SelectTrigger disabled={true} className='border border-gray-500'>
                                <SelectValue>{profileData.gender}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input id="date_of_birth" type="date" defaultValue={profileData.date_of_birth} className='border border-gray-500' disabled={true} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="id_number">ID Number</Label>
                    <Input id="id_number" defaultValue={profileData.id_number} className='border border-gray-500' disabled={true} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="home_phone">Home Phone</Label>
                        <div className="flex gap-2">
                            <Input
                                className="w-20 border border-gray-500"
                                defaultValue={profileData.home_phone_country_code}
                                disabled={true}
                            />
                            <Input
                                className="flex-1 border border-gray-500"
                                id="home_phone"
                                defaultValue={profileData.home_phone}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cell_phone">Cell Phone</Label>
                        <div className="flex gap-2">
                            <Input
                                className="w-20 border border-gray-500"
                                defaultValue={profileData.cell_phone_country_code}
                                disabled={true}
                            />
                            <Input
                                className="flex-1 border border-gray-500"
                                id="cell_phone"
                                defaultValue={profileData.cell_phone}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={profileData.address} className='border border-gray-500' disabled={true} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;
