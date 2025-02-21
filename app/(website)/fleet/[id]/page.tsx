"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import Fleet from "@/data/mock/Fleet.json"

const Details = () => {
  const params = useParams();
  const TruckData = Fleet.find(i => i.id === Number(params.id));
  return (
    <div>Details {TruckData?.make}</div>
  )
}

export default Details
