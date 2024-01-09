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
    });
  }
  async getPlanById(id:number): Promise<Plan> {
    return await this.plansRepository.findOne({
      relations: {
        channels: true,
      },
      where:{id}
    });
  }

  addPlan(plan: Plan): Promise<Plan> {
    const newPlan = this.plansRepository.create(plan);
    return this.plansRepository.save(newPlan);
  }

  async deletePlan(id: number): Promise<DeleteResult> {
    return await this.plansRepository.delete({ id });
  }

 async expires(id: number) {
    const data = await this.plansRepository.findOne({ where: { id } });
    const num: number = +data!.duration[0];
    const monthOrYear: string = data!.duration[1];

    const currentDate = new Date();

    // Add 1 month to the current date
    const expiryDate = new Date(currentDate);

    monthOrYear == ('Year' || 'year' || 'Years' || 'years')
      ? expiryDate.setFullYear(currentDate.getFullYear() + num)
      : expiryDate.setMonth(currentDate.getMonth() + num);

    // Format the dates as strings for better readability
    const currentDateStr = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const expiryDateStr = expiryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    return { currentDate, expiryDate };
  }
}
