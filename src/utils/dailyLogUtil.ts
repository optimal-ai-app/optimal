import httpService from '../../services/httpService';

export interface DailyLogEntry {
    userId: string;
    transcript: string;
    // date: string;
}

export interface DailyLogResponse {
    id?: string;
    success: boolean;
    message?: string;
}

class DailyLogUtil {
    /**
     * Submits a daily log entry to the backend
     * @param userId - The ID of the user creating the log
     * @param transcript - The transcript text from the recording
     * @returns Promise with the response from the backend
     */
    async submitDailyLog(userId: string, transcript: string): Promise<DailyLogResponse> {
        try {
            if (!userId || !transcript.trim()) {
                throw new Error('User ID and transcript are required');
            }

            const dailyLogEntry: DailyLogEntry = {
                userId,
                transcript: transcript.trim(),
            };

            const response = await httpService.post<DailyLogResponse>('/api/diary/create', dailyLogEntry);
            return response;
        } catch (error) {
            console.error('Error submitting daily log:', error);
            throw error;
        }
    }

    /**
     * Formats a date string for display
     * @param dateString - ISO date string
     * @returns Formatted date string
     */
    formatDate(dateString: string): string {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    }
}

// Export a singleton instance
const dailyLogUtil = new DailyLogUtil();
export default dailyLogUtil;
