import { Body, Get, Post, Controller, Delete } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from 'src/enitites/plan.entity';
import { DeleteResult } from 'typeorm';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}
    
    @Post("/add-plan")
    addPlan(@Body() plan:Plan): Promise<Plan> {
        return this.plansService.addPlan(plan);
    }
    
    @Get("/get-plan")
    getPlans(): Promise<Plan[]> {
        return this.plansService.getPlans();
    }
    
    @Delete("/delete:id")
    deletePlan(id:number): Promise<DeleteResult> {
        return this.plansService.deletePlan(id);
    }
    
}
