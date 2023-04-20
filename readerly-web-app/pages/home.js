import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';

import AppBar from '@/components/appBar';

import { useAuth } from '@clerk/nextjs';
import { supabaseClient } from '@/utils/supabaseClient';
import Book from '@/components/book';

export default function Home() {
    const [recommendations, setRecommendations] = useState([]);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        const getRecommendations = async () => {
            const token = await getToken({ template: 'supabase' })
            const supabase = await supabaseClient(token);
            const { data, error } = await supabase
                .from('Recommendations')
                .select('*')
                .eq('User-ID', userId)
            setRecommendations(data);
        }
        getRecommendations();
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            const token = await getToken({ template: 'supabase' })
            const supabase = await supabaseClient(token);
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', userId)
            console.log('users: ', data)

            if (data.length === 0) {
                const { data, error } = await supabase
                    .from('users')
                    .insert(
                        { user_id: userId }
                    )
                    .single()
                console.log('user inserted: ', data)
            }
        }
        getUsers()
    }, [])

    return (
        <Box>
            <Box sx={{ width: '100%', marginTop: 10, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography sx={{ textAlign: 'center' }} variant="h4">Recommendations based on your interests</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: 10 }}>
                    {recommendations.map((book, index) => {
                        { console.log('first: ', book) }
                        return <Book key={book.id} type='recommendation' book={book} />
                    })}
                </Box>
            </Box>
        </Box>
    )
}