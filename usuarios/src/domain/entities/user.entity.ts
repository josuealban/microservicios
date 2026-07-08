import { Gender } from '../enums/gender.enum';
import { SubscriptionTier } from '../enums/subscription-tier.enum';
import { SubscriptionPlan } from './subscription-plan.entity';
import { Photo } from './photo.entity';

export class User {
  id: number;
  email: string;
  password?: string;
  phone?: string;
  name: string;
  age: number;
  bio?: string;
  weight?: number;
  height?: number;
  nationality?: string;
  gender?: Gender;
  city?: string;
  country?: string;

  // Interests & Details
  zodiacSign?: string;
  seeking?: string;
  location?: string;
  job?: string;
  hobbies: string[];

  // Integrations
  spotifyId?: string;
  musicList: string[];

  // Subscription
  subscription: SubscriptionTier;
  subscriptionPlan?: SubscriptionPlan;
  donationsEnabled: boolean;

  // Security/Restrictions
  isRestricted: boolean;

  // Relations
  photos: Photo[];

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.hobbies = this.hobbies || [];
    this.musicList = this.musicList || [];
    this.photos = this.photos || [];
    if (partial.subscriptionPlan) {
      this.subscriptionPlan = new SubscriptionPlan(partial.subscriptionPlan);
    }
  }
}

