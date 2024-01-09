import { Controller, Param, Post, Req} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { Subscription } from 'src/enitites/subscription.entity';

@Controller('subscribe')
export class SubscribeController {
    constructor(private readonly subscribeService: SubscribeService) {}

    @Post("/plan/:id?")
    addPlan(@Param("id") id:number, @Req() req:any): Promise<Subscription> {    
        return this.subscribeService.subscribePlan(id,req[`data`].id);
    }
}
