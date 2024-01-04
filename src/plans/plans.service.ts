import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/enitites/plan.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  async getPlans(): Promise<Plan[]> {
    return await this.plansRepository.find({
      relations: {
        channels: true,
      },
    })
  }
  addPlan(plan: Plan): Promise<Plan> {
    const newPlan = this.plansRepository.create(plan);
    return this.plansRepository.save(newPlan);
  }
  async deletePlan(id: number): Promise<DeleteResult> {
    return await this.plansRepository.delete({id});
  }
}
