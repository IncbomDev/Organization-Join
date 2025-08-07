'use server';

export async function inviteUserToOrg(username: string, orgPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!username) return { success: false, error: 'Username is required' };

    const org = process.env.GITHUB_ORGANIZATION;
    const token = process.env.GITHUB_TOKEN;
    const expectedPassword = process.env.ORGANIZATION_PASSWORD;

    if (expectedPassword && orgPassword !== expectedPassword) {
        return { success: false, error: 'Invalid organization password' };
    }

    if (!org || !token) return { success: false, error: 'Missing GITHUB_ORG or GITHUB_TOKEN in env' };

    // 1. Get user ID
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'SpikeStudents-App'
        }
    });

    if (!userRes.ok) {
        return { success: false, error: `User not found or GitHub API error (${userRes.status})` };
    }

    const userData = await userRes.json();

    // @ts-expect-error
    const userId = userData.id;

    // 2. Invite user by ID
    const inviteRes = await fetch(`https://api.github.com/orgs/${org}/invitations`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'SpikeStudents-App'
        },
        body: JSON.stringify({
            invitee_id: userId,
            role: 'direct_member'
        }),
    });

    if (inviteRes.ok) {
        return { success: true };
    } else {
        const error = await inviteRes.json();
        // @ts-ignore
        return { success: false, error: error.message || 'Failed to invite user' };
    }
}