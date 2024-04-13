"use client";

import { Layout } from '@/components/layout/layout'
import React from 'react'

const DashboardLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <Layout>
        {children}
    </Layout>
  )
}

export default DashboardLayout