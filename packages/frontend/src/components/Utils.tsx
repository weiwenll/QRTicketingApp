import { SessionUserData } from "../services/types";

class Utils {
  static millisecondsToDateyyyyMMdd(milliseconds: number): string {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary

    return `${year}-${month}-${day}`;
  }

  static getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'ACTIVE';
      case 2:
        return 'ENTRY';
      case 3:
        return 'EXIT';
      case 4:
        return 'ENTRY_UPGRADE';
      case 5:
        return 'EXIT_UPGRADE';
      case 6:
        return 'CANCELED';
      case 7:
        return 'REFUNDED';
      default:
        return 'INACTIVE';
    }
  }

  static getJourneyTypeLabel(status: number): string {
    switch (status) {
      case 1:
        return 'SINGLE';
      case 2:
        return 'RETURN_TICKET';
      case 3:
        return 'GROUP';
      default:
        return 'UNSPPORTED';
    }
  }

  static getTicketTypeLabel(status: number): string {
    switch (status) {
      case 1:
        return 'ADULT';
      case 2:
        return 'CHILD';
      case 3:
        return 'SENIOR';
      default:
        return 'UNSPPORTED';
    }
  }
}

export const getSessionUserData = (): SessionUserData | null => {
  const storedSessionUserData = localStorage.getItem('sessionUserData');

  // Parse the string into a SessionUserData object or return null if null/undefined
  return storedSessionUserData ? JSON.parse(storedSessionUserData) : null;
};

export default Utils;