import { users, type User, type InsertUser, type Waitlist, type InsertWaitlist, type EmailSubscription, type InsertEmailSubscription } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateCredentials(username: string, password: string): Promise<User | null>;
  
  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  
  // Email subscription operations
  addEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptions(): Promise<EmailSubscription[]>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
  
  // Session store for authentication
  sessionStore: any;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, Waitlist>;
  private emailSubscriptions: Map<number, EmailSubscription>;
  private currentUserId: number;
  private currentWaitlistId: number;
  private currentEmailSubscriptionId: number;
  sessionStore: any;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.emailSubscriptions = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
    this.currentEmailSubscriptionId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Create a default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this should be hashed
      isAdmin: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    // Ensure isAdmin is always boolean
    const user: User = { 
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin === undefined ? false : insertUser.isAdmin
    };
    this.users.set(id, user);
    return user;
  }
  
  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  
  // Waitlist methods
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentWaitlistId++;
    // Ensure message is always string | null
    const waitlistEntry: Waitlist = { 
      ...entry, 
      id,
      message: entry.message === undefined ? null : entry.message
    };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }
  
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return Array.from(this.waitlist.values());
  }
  
  // Email subscription methods
  async addEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = this.currentEmailSubscriptionId++;
    const emailSubscription: EmailSubscription = { ...subscription, id };
    this.emailSubscriptions.set(id, emailSubscription);
    return emailSubscription;
  }
  
  async getEmailSubscriptions(): Promise<EmailSubscription[]> {
    return Array.from(this.emailSubscriptions.values());
  }
  
  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    return Array.from(this.emailSubscriptions.values()).find(
      (subscription) => subscription.email === email
    );
  }
}

export const storage = new MemStorage();
