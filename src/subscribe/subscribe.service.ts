import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/enitites/subscription.entity';
import { PlansService } from 'src/plans/plans.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribeService {
    
    constructor(
        @InjectRepository(Subscription)
        private subscribeRepository: Repository<Subscription>,

        private readonly plansService: PlansService

        ) {}

    async subscribePlan (planId:number,userId:number) : Promise<Subscription | null> { 
        
        const expiry = await this.plansService.expires(planId)
      
        const subscribe = this.subscribeRepository.create(
          Object.assign(new Subscription(), {
          startDate: (await expiry).currentDate,
          expiryDate:(await expiry).expiryDate,
          plansId: planId,
          userId: userId
          })
        )
        return await this.subscribeRepository.save(subscribe)
    };
}
