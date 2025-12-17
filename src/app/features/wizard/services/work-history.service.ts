import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WorkHistory {
    id: string;
    organization: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    startDate: string;
    endDate: string;
    hasGaps?: boolean;
    explanation?: string;
}

@Injectable({
    providedIn: 'root'
})
export class WorkHistoryService {
    private workHistoriesSubject = new BehaviorSubject<WorkHistory[]>([]);
    public workHistories$: Observable<WorkHistory[]> = this.workHistoriesSubject.asObservable();

    constructor() { }

    getWorkHistories(): WorkHistory[] {
        return this.workHistoriesSubject.value;
    }

    addWorkHistory(history: WorkHistory): void {
        const currentHistories = this.workHistoriesSubject.value;
        if (currentHistories.length < 5) {
            this.workHistoriesSubject.next([...currentHistories, history]);
        }
    }

    updateWorkHistory(id: string, history: WorkHistory): void {
        const currentHistories = this.workHistoriesSubject.value;
        const index = currentHistories.findIndex(h => h.id === id);
        if (index !== -1) {
            currentHistories[index] = history;
            this.workHistoriesSubject.next([...currentHistories]);
        }
    }

    deleteWorkHistory(id: string): void {
        const currentHistories = this.workHistoriesSubject.value;
        this.workHistoriesSubject.next(currentHistories.filter(h => h.id !== id));
    }

    canAddMore(): boolean {
        return this.workHistoriesSubject.value.length < 5;
    }

    generateId(): string {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}
