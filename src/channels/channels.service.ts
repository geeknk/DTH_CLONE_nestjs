import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/enitites/channel.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  getChannels(): Promise<Channel[]> {
    return this.channelsRepository.find();
  }

  createChannel(channel: Channel): Promise<Channel> {
    const newChannel = this.channelsRepository.create(channel);
    return this.channelsRepository.save(newChannel);
  }
  
  deleteChannels(id: number):Promise<DeleteResult> {
    return this.channelsRepository.delete({id});
  }

}
