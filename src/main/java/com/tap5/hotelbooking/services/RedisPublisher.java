package com.tap5.hotelbooking.services;

public interface RedisPublisher
{
    void publish(String channel, String message);
}
