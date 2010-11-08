package com.tap5.hotelbooking.services;

import org.apache.tapestry5.ioc.ScopeConstants;
import org.apache.tapestry5.ioc.annotations.Scope;

import redis.clients.jedis.Jedis;

@Scope(value = ScopeConstants.PERTHREAD)
public class RedisPublisherImpl implements RedisPublisher
{
    private Jedis jedis;

    public RedisPublisherImpl()
    {
        this.jedis = new Jedis("localhost");
    }

    public void publish(String channel, String message)
    {
        jedis.publish(channel, message);
    }

}
