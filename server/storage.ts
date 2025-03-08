import { users, type User, type InsertUser, type Waitlist, type InsertWaitlist, type EmailSubscription, type InsertEmailSubscription } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  
  // Email subscription operations
  addEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptions(): Promise<EmailSubscription[]>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, Waitlist>;
  private emailSubscriptions: Map<number, EmailSubscription>;
  private currentUserId: number;
  private currentWaitlistId: number;
  private currentEmailSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.emailSubscriptions = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
    this.currentEmailSubscriptionId = 1;
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Waitlist methods
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentWaitlistId++;
    const waitlistEntry: Waitlist = { ...entry, id };
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
