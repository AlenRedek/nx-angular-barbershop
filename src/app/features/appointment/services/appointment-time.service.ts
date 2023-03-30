import dayjs from 'dayjs';

import { Appointment, BusyHour, Service, WorkHour } from '@app-core/models';
import { AppointmentData } from '@app-features/appointment/models';

export class AppointmentTimeService {
  public busyHours: Array<BusyHour> = [];
  public date: dayjs.Dayjs = dayjs();

  public constructor(
    public appointmentData: AppointmentData,
    public appointments: Array<Appointment>,
    public services: Array<Service>,
  ) {
    this.setDate();
    this.setBusyHours();
  }

  public setBusyHours(): void {
    const busyHours = this.appointments
      .filter((appointment) =>
        this.getDateFromTimestamp(appointment.startDate).isSame(
          this.date,
          'day',
        ),
      )
      .filter((appointment) =>
        // Service durationMinutes must be defined to prevent an infinite loop
        this.services.some((service) => service.id === appointment.serviceId),
      )
      .map((appointment) => {
        const service = this.services.find(
          (service) => service.id === appointment.serviceId,
        ) as Service;
        const startAppointment = this.getDateFromTimestamp(
          appointment.startDate,
        );

        return {
          start: startAppointment,
          end: startAppointment.add(service.durationMinutes, 'minutes'),
        };
      });

    this.busyHours = [...busyHours, ...this.getLunchTime()];
  }

  public getTimes(): Array<dayjs.Dayjs> {
    const { service } = this.appointmentData;
    const times: Array<dayjs.Dayjs> = [];
    const workHour = this.getWorkHour();

    if (!service || !workHour) {
      return times;
    }

    let startService = this.getStartHour(workHour.startHour);

    while (this.isServiceDuringWorkHour(startService, service, workHour)) {
      const busyHour = this.getBusyHourDuringService(startService, service);

      if (busyHour) {
        startService = busyHour.end.clone();
      } else {
        times.push(startService);
        startService = startService.add(service.durationMinutes, 'minutes');
      }
    }

    return times;
  }

  private isServiceDuringWorkHour(
    startService: dayjs.Dayjs,
    service: Service,
    workHour: WorkHour,
  ): boolean {
    const endService = startService
      .add(service.durationMinutes, 'minutes')
      .format('Hmm');
    const endWorkHour = this.getDateWithHour(workHour.endHour).format('Hmm');

    return Number(endService) <= Number(endWorkHour);
  }

  private getBusyHourDuringService(
    startService: dayjs.Dayjs,
    service: Service,
  ): BusyHour | undefined {
    return this.busyHours.find((busyHour) => {
      const endService = startService.add(service.durationMinutes, 'minutes');

      return (
        // '[)' includes the start time but excludes the end time
        busyHour.start.isBetween(startService, endService, 'minute', '[)')
      );
    });
  }

  private getLunchTime(): Array<BusyHour> {
    const { lunchTime } = this.getWorkHour() ?? {};

    if (!lunchTime) {
      return [];
    }

    const startLunchTime = this.getDateWithHour(lunchTime.startHour);

    return [
      {
        start: startLunchTime,
        end: startLunchTime.add(lunchTime.durationMinutes, 'minutes'),
      },
    ];
  }

  private getWorkHour(): WorkHour | undefined {
    const { barber } = this.appointmentData;
    const dayNumber = this.date.day();

    return barber?.workHours.find((hours) => hours.day === dayNumber);
  }

  private getStartHour(hour: number): dayjs.Dayjs {
    const currentTime = Number(dayjs().utc().format('H'));
    let startHour = hour;

    if (this.date.isToday()) {
      startHour = currentTime > hour ? currentTime + 1 : hour;
    }

    return this.getDateWithHour(startHour);
  }

  private getDateWithHour(hour: number): dayjs.Dayjs {
    return this.date.set('hour', hour).set('minute', 0).set('second', 0);
  }

  private getDateFromTimestamp(timestamp: number = 0): dayjs.Dayjs {
    // Prevent Dayjs automatic conversion to local time with .utc()
    // True should not be passed because the timestamp is already in UTC
    return dayjs.unix(timestamp).utc();
  }

  private setDate(): void {
    const { date } = this.appointmentData;

    // Change the time zone without changing the current time
    this.date = dayjs(date).utc(true);
  }
}
