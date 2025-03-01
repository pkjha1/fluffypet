export type VetSpecialization =
  | "General Practice"
  | "Surgery"
  | "Dermatology"
  | "Cardiology"
  | "Neurology"
  | "Oncology"
  | "Emergency Care"
  | "Exotic Animals"

export type VetStatus = "active" | "inactive" | "on_leave"

export type WorkingHours = {
  day: string
  startTime: string
  endTime: string
  available: boolean
}

export interface VetProfile {
  id: string
  userId: string
  name: string
  title: string
  licenseNumber: string
  specializations: VetSpecialization[]
  experience: number
  status: VetStatus
  bio: string
  imageUrl?: string
  contactEmail: string
  contactPhone: string
  workingHours: WorkingHours[]
  isIndependent: boolean
  clinicAffiliations: ClinicAffiliation[]
  ratings: {
    average: number
    total: number
  }
  verification: {
    isVerified: boolean
    documents: VerificationDocument[]
  }
}

export interface ClinicAffiliation {
  clinicId: string
  clinicName: string
  role: "Primary" | "Visiting" | "Emergency"
  schedule: WorkingHours[]
  startDate: Date
  endDate?: Date
}

export interface VerificationDocument {
  id: string
  type: "license" | "certification" | "degree"
  name: string
  issuer: string
  issuedDate: Date
  expiryDate?: Date
  verificationStatus: "pending" | "verified" | "rejected"
  documentUrl: string
}

export interface Clinic {
  id: string
  name: string
  type: "clinic" | "hospital"
  address: string
  location: {
    lat: number
    lng: number
  }
  contactPhone: string
  contactEmail: string
  workingHours: WorkingHours[]
  facilities: string[]
  emergencyServices: boolean
  veterinarians: VetProfile[]
  ratings: {
    average: number
    total: number
  }
  images: string[]
  verification: {
    isVerified: boolean
    documents: VerificationDocument[]
  }
}

