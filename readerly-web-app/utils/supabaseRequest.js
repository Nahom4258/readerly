import { supabaseClient } from "./supabaseClient";

export const getWishlists = async({userId, token}) => {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', userId)
    return { data, error };
}

export const getReadBooks = async({userId, token}) => {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
        .from('read_books')
        .select('*')
        .eq('user_id', userId)
    return { data, error };
}