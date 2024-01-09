import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from 'src/enitites/channel.entity';
import { DeleteResult } from 'typeorm';

@Controller('channel')
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) {}
    
    @Post("/add")
    registerUser(@Body() channel:Channel): Promise<Channel> {           
        return this.channelsService.createChannel(channel);
    }
    
    @Get("/get-channels")
    getChannels(): Promise<Channel[]> {
        return this.channelsService.getChannels();
    }
    
    @Delete("/delete/:id")
    deleteChannel(@Param() id:number): Promise<DeleteResult> {
        return this.channelsService.deleteChannels(id);
    }
}
