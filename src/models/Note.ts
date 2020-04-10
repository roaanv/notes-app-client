export interface NoteData {
  content: string;
  attachment?: any;
  attachmentURL?: string;
}

export interface Note extends NoteData {
  noteId: string;
  createdAt: number;
}