import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    const day = date.getDate();
    const year = date.getFullYear();
    const month = this.getMonthAbbreviation(date.getMonth());
    const weekday = this.getWeekdayName(date.getDay());

    return `${month} ${day}, ${year} (${weekday})`;
  }

  private getMonthAbbreviation(monthIndex: number): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return months[monthIndex];
  }

  private getWeekdayName(dayIndex: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
  }
}
