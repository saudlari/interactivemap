
import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }

  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

export {};
