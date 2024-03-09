"use client";

import React, { FormEvent } from 'react'
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'

import { Calendar } from "@/components/ui/calendar"
import { json } from 'stream/consumers';
import { error } from 'console';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  date: z.date(),
  time: z.string(),
})

const BookingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      time: ""
    }
  })

  const times = ["9:00am", "10:00am", "11:00am", "12:00pm", "13:00pm", "14:00pm", "15:00pm", "16:00pm", "17:00pm"]

  const handleSubmit = async ( formData:z.infer<typeof formSchema>) => {
    const data = JSON.stringify(formData)
    
    const response = await fetch('/api/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    })
    .then(response => {
      if (!response.ok) {
        console.log(response.json());
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));

    console.log(response)
  }

  return (
    <section className="flex flex-col w-[50%] items-center justify-center">
      <h2 className="text-2xl">Book an Appointment</h2>

      <Separator className='my-5'/>
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-col gap-5'
        >
          <div className='flex gap-10'>
            <div className='flex flex-col gap-4'>
              <FormField 
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='Your name' 
                        type='text'
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='Your email address' 
                        type='email'
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='phone'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='Your phone number' 
                        type='text'
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='time'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {times.map((time) => (
                            <SelectItem
                              value={time}
                              key={time}
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField 
              control={form.control}
              name='date'
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Calendar 
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          </div>

          <Button
            type='submit'
            className='w-full'
          >
            Book Now
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default BookingForm