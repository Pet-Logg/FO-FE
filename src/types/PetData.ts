export interface PetData{
  petId: number | null;
  petImg: string | null;
  petFile?: File | null;
  petName: string;
  animal: string;
  petBirth: string;
  petBreed: string;
  petGender: string;
  petWeight: number | null;
  isNeutered?: boolean | null;
  disease?: string[] | null;
  allergy?: string[] | null;
}
