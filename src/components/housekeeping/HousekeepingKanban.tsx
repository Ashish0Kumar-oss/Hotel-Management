import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Clock, AlertTriangle, User, ArrowRight, ArrowLeft, Filter, Plus
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { HousekeepingColumn, HousekeepingPriority } from '../../types';

export const HousekeepingKanban: React.FC = () => {
  const { housekeeping, updateHousekeepingStatus } = useHotel();
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const columns: { id: HousekeepingColumn; title: string; color: string }[] = [
    { id: 'Dirty', title: 'Dirty Rooms', color: 'text-rose-500 border-rose-500/30 bg-rose-500/10' },
    { id: 'Cleaning', title: 'Cleaning In Progress', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
    { id: 'Inspection', title: 'Inspection Required', color: 'text-blue-500 border-blue-500/30 bg-blue-500/10' },
    { id: 'Ready', title: 'Ready for Guests', color: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' }
  ];

  const filteredTasks = housekeeping.filter(t => 
    priorityFilter === 'All' || t.priority === priorityFilter
  );

  const getPriorityBadge = (p: HousekeepingPriority) => {
    switch (p) {
      case 'High':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-extrabold border-rose-500/30';
      case 'Normal':
        return 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium';
    }
  };

  const moveNext = (id: string, currentStatus: HousekeepingColumn) => {
    const sequence: HousekeepingColumn[] = ['Dirty', 'Cleaning', 'Inspection', 'Ready'];
    const idx = sequence.indexOf(currentStatus);
    if (idx < sequence.length - 1) {
      updateHousekeepingStatus(id, sequence[idx + 1]);
    }
  };

  const movePrev = (id: string, currentStatus: HousekeepingColumn) => {
    const sequence: HousekeepingColumn[] = ['Dirty', 'Cleaning', 'Inspection', 'Ready'];
    const idx = sequence.indexOf(currentStatus);
    if (idx > 0) {
      updateHousekeepingStatus(id, sequence[idx - 1]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-amber-500" />
            Housekeeping & Sanitization Kanban
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time suite turnaround tracking, staff assignments, quality inspection checklists.
          </p>
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Priority:
          </span>
          {['All', 'High', 'Normal', 'Low'].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                priorityFilter === p
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => {
          const tasksInCol = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              className="glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-4 flex flex-col h-[70vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold font-heading border ${col.color}`}>
                  {col.title}
                </span>
                <span className="text-xs font-bold font-stat text-slate-500 dark:text-slate-400">
                  {tasksInCol.length}
                </span>
              </div>

              {/* Task Cards Column Body */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {tasksInCol.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">
                    No tasks in {col.title}
                  </div>
                ) : (
                  tasksInCol.map(task => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:shadow-lg transition-all hover:border-amber-500/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm font-heading text-slate-900 dark:text-slate-100">
                          Suite {task.roomNumber}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityBadge(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {task.roomType} • Floor {task.floor}
                      </p>

                      {task.specialNotes && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                          "{task.specialNotes}"
                        </p>
                      )}

                      {/* Staff & Est Time */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center space-x-2">
                          <img src={task.assignedStaff.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{task.assignedStaff.name}</span>
                        </div>
                        {task.estimatedMinutes > 0 && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-stat">
                            <Clock className="w-3 h-3 text-amber-500" /> {task.estimatedMinutes}m
                          </span>
                        )}
                      </div>

                      {/* Move Column Actions */}
                      <div className="flex items-center justify-between pt-1">
                        {col.id !== 'Dirty' ? (
                          <button
                            onClick={() => movePrev(task.id, task.status)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                            title="Move Back"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        ) : <div />}

                        {col.id !== 'Ready' ? (
                          <button
                            onClick={() => moveNext(task.id, task.status)}
                            className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Ready
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
