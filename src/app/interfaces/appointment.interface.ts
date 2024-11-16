export interface IAppointment {
  id: number;
  doctorCi: string;
  patientCi: string;
  attentionDateAndTime: Date;
  status: string;
}
