const db = require('../config/db'); 

// === INNER JOIN 
exports.usersWithRoles = (req, res) => { 
    const sql = `
        SELECT u.id, u.email, r.role_name 
        FROM users u 
        INNER JOIN user_roles ur ON ur.user_id = u.id 
        INNER JOIN roles r ON r.id = ur.role_id 
        ORDER BY u.id, r.role_name; 
        `
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
}; 

// === LEFT JOIN === 
exports.usersWithProfiles = (req, res) => { 
    const sql = `
        SELECT u.id, u.email, p.phone, p.city, p.country 
        FROM users u 
        LEFT JOIN profiles p ON p.user_id = u.id 
        ORDER BY u.id;
        `  
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
}; 

// === RIGHT JOIN === 
exports.rolesRightJoin = (req, res) => { 
    const sql = `
        SELECT r.role_name, u.id AS user_id, u.email 
        FROM users u 
        RIGHT JOIN user_roles ur ON ur.user_id = u.id 
        RIGHT JOIN roles r ON r.id = ur.role_id 
        ORDER BY r.role_name, user_id; 
        `
    ; 
    db.query(sql, [], (err, rows) => { if (err) return res.status(500).json({ error: err.message }); 
    return res.json(rows); 
    }); 
}; 

// === FULL OUTER (UNION) === 
exports.profilesFullOuter = (req, res) => { 
    const sql = `
        SELECT u.id AS user_id, u.email, p.id AS profile_id, 
        CASE WHEN p.id IS NULL THEN 'No Profile' ELSE 'Has Profile' END AS profile_status 
        FROM users u LEFT JOIN profiles p ON p.user_id = u.id 
        UNION 
        SELECT u.id AS user_id, u.email, p.id AS profile_id, 
        CASE WHEN p.id IS NULL THEN 'No Profile' ELSE 'Has Profile' END AS profile_status 
        FROM users u RIGHT JOIN profiles p ON p.user_id = u.id 
        ORDER BY user_id; 
        `
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
}; 

// === CROSS JOIN === 
exports.userRoleCombos = (req, res) => { 
    const sql = `
        SELECT u.id AS user_id, u.email, r.role_name 
        FROM users u 
        CROSS JOIN roles r 
        ORDER BY u.id, r.role_name; 
        `
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
}; 

// === SELF JOIN (referrals) === 
exports.referrals = (req, res) => { 
    const sql = `
        SELECT u1.email AS referrer, u2.email AS referred 
        FROM referrals ref 
        INNER JOIN users u1 ON u1.id = ref.referrer_user_id 
        INNER JOIN users u2 ON u2.id = ref.referred_user_id; 
        `
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
}; 

// === Latest login per user === 
exports.latestLogin = (req, res) => { 
    const sql = `
        SELECT u.id, u.email, la.ip_address, la.occurred_at 
        FROM users u 
        LEFT JOIN ( 
            SELECT user_id, ip_address, occurred_at 
            FROM login_audit la1 
            WHERE occurred_at = ( 
                SELECT MAX(occurred_at) 
                FROM login_audit la2 
                WHERE la2.user_id = la1.user_id 
            )
        ) la ON la.user_id = u.id 
        ORDER BY u.id; 
        `
    ; 
    db.query(sql, [], (err, rows) => { 
        if (err) return res.status(500).json({ error: err.message }); 
        return res.json(rows); 
    }); 
};