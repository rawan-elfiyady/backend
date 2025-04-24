const supabase = require('../Config/supabaseClient');

async function getAdmins() {
    const { data, error } = await supabase
    .from('admins')
    .select('*');

    if(error)
        throw error;

    return data;
}

async function getAdminById(id) {
    const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('id', id)
    .single();

    if(error)
        throw error;

    return data;
}
async function getAdminByEmail(email) {
    const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

    if(error && error.code !== 'PGRST116')
        throw error;

    return data;
}

async function createAdmin(admin) {
    const { data, error } = await supabase
    .from('admins')
    .insert([admin])                        
    .single();                            
    if (error) throw error;
    return data;                             
}

async function removeAdmin(id) {
    const { error } = await supabase
    .from('admins')
    .delete()
    .eq('id', id);
    if (error) throw error;                 
}

module.exports = {
    getAdmins,
    getAdminById,
    getAdminByEmail,
    createAdmin,
    removeAdmin
}