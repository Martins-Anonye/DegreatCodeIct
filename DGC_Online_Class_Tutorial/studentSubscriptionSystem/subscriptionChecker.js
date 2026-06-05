/**
 * Subscription Checker Utility
 * Use this module to check if a user has an active subscription for a specific category
 * Include it in watchTutorialLink.html and other pages that need subscription validation
 */

export async function checkCategorySubscription(db, auth, categoryId) {
    /**
     * Check if user has active subscription for a category
     * @param {Object} db - Firebase database instance
     * @param {Object} auth - Firebase auth instance
     * @param {string} categoryId - Category ID to check
     * @returns {Promise<{hasAccess: boolean, subscription: Object|null, message: string}>}
     */

    const user = auth.currentUser;
    
    if (!user) {
        return {
            hasAccess: false,
            subscription: null,
            message: 'Please sign in to access this content',
            requiresSignIn: true
        };
    }

    try {
        const { ref, get, child } = await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js');
        const dbRef = ref(db);

        // Get user's subscriptions
        const snapshot = await get(child(dbRef, `userSubscriptions/${user.uid}`));
        
        if (!snapshot.exists()) {
            return {
                hasAccess: false,
                subscription: null,
                message: 'No active subscription. Subscribe to access this content.',
                requiresSubscription: true
            };
        }

        const subscriptions = snapshot.val();
        const today = new Date();

        // Check each subscription
        for (const [planId, subscription] of Object.entries(subscriptions)) {
            const endDate = new Date(subscription.endDate);

            // Check if subscription is still active
            if (today <= endDate) {
                // Check if category is in this plan
                const hasCategory = subscription.categories.some(cat => cat.id === categoryId);
                
                if (hasCategory) {
                    return {
                        hasAccess: true,
                        subscription: subscription,
                        message: 'You have access to this content',
                        expiresOn: endDate.toLocaleDateString()
                    };
                }
            }
        }

        return {
            hasAccess: false,
            subscription: null,
            message: 'This category is not included in your subscription plan.',
            requiresSubscription: true
        };

    } catch (error) {
        console.error('Error checking subscription:', error);
        return {
            hasAccess: false,
            subscription: null,
            message: 'Error checking subscription status. Please try again.',
            error: true
        };
    }
}

export function showSubscriptionModal(message, actionType = 'subscribe') {
    /**
     * Display a modal prompting user to subscribe
     * @param {string} message - Message to display
     * @param {string} actionType - 'subscribe', 'signin', or 'expired'
     */

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 30px;
        max-width: 450px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
    `;

    let icon = '🔒';
    let title = 'Subscription Required';
    let actionText = 'Subscribe Now';
    let actionLink = '../studentSubscriptionSystem/studentSubscription.html';

    if (actionType === 'signin') {
        icon = '🔑';
        title = 'Sign In Required';
        actionText = 'Sign In';
        actionLink = '../auth.html';
    } else if (actionType === 'expired') {
        icon = '⏱️';
        title = 'Subscription Expired';
        actionText = 'Renew Subscription';
        actionLink = '../studentSubscriptionSystem/studentSubscription.html';
    }

    content.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">${icon}</div>
        <h2 style="color: #0f172a; margin-bottom: 15px; font-size: 1.6rem;">${title}</h2>
        <p style="color: #64748b; margin-bottom: 25px; line-height: 1.6;">${message}</p>
        <button onclick="this.parentElement.parentElement.remove(); window.location.href='${actionLink}';" style="
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
            margin-bottom: 10px;
        ">${actionText}</button>
        <button onclick="this.parentElement.parentElement.remove();" style="
            background: #e2e8f0;
            color: #64748b;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
        ">Cancel</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    return modal;
}

export function createSubscriptionBar(subscription) {
    /**
     * Create a subscription info bar showing expiration
     * @param {Object} subscription - Subscription object
     * @returns {HTMLElement}
     */

    const bar = document.createElement('div');
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    const colors = daysLeft > 7 ? '#d1fae5' : daysLeft > 0 ? '#fef3c7' : '#fee2e2';
    const textColor = daysLeft > 7 ? '#065f46' : daysLeft > 0 ? '#92400e' : '#991b1b';

    bar.style.cssText = `
        background: ${colors};
        color: ${textColor};
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: 600;
    `;

    if (daysLeft > 0) {
        bar.textContent = `✅ Active Subscription: ${daysLeft} day${daysLeft > 1 ? 's' : ''} remaining`;
    } else {
        bar.textContent = `⏱️ Subscription Expired - Renew to continue`;
    }

    return bar;
}

export async function checkAndBlockContent(db, auth, categoryId, containerElement) {
    /**
     * Check subscription and block/unblock content
     * @param {Object} db - Firebase database instance
     * @param {Object} auth - Firebase auth instance
     * @param {string} categoryId - Category ID to check
     * @param {HTMLElement} containerElement - Element containing the content to block
     * @returns {Promise<boolean>} - true if access granted, false if blocked
     */

    const result = await checkCategorySubscription(db, auth, categoryId);

    if (!result.hasAccess) {
        // Blur the content
        containerElement.style.filter = 'blur(8px)';
        containerElement.style.pointerEvents = 'none';

        // Show subscription modal
        const actionType = result.requiresSignIn ? 'signin' : result.requiresSubscription ? 'subscribe' : 'expired';
        showSubscriptionModal(result.message, actionType);

        return false;
    } else {
        // Add subscription bar
        const bar = createSubscriptionBar(result.subscription);
        containerElement.insertBefore(bar, containerElement.firstChild);
        return true;
    }
}
