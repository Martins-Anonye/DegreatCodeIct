# Subscription System - Implementation Guide

## Overview
Complete subscription management system for tutorial content with support for Paystack and Flutterwave payments.

## Files

### 1. Admin Panel: `adminSubscriptionPlans.html`
**URL:** `studentSubscriptionSystem/adminSubscriptionPlans.html`

**Features:**
- Create subscription plans
- Select multiple categories for each plan
- Set pricing and duration
- View and manage active plans
- Delete plans

**How to Use:**
1. Open the admin panel
2. Fill in plan details:
   - Plan Name (e.g., "Basic Learning Pack")
   - Price in Naira (₦)
   - Duration in days (30, 60, 90, etc.)
   - Description (optional)
3. Select categories from the checklist
4. Click "Create Subscription Plan"
5. Plans appear in the list below

---

### 2. Student Portal: `studentSubscription.html`
**URL:** `studentSubscriptionSystem/studentSubscription.html`

**Features:**
- Browse available subscription plans
- View plan details and included categories
- Check subscription status
- Subscribe with Paystack or Flutterwave
- Track subscription expiration

**How to Use:**
1. Students sign in via auth.html
2. Visit subscription portal
3. Choose a plan
4. Click "Subscribe Now"
5. Enter phone number
6. Select payment method (Paystack/Flutterwave)
7. Complete payment
8. Subscription is activated immediately

---

### 3. Subscription Checker: `subscriptionChecker.js`
**Import in watchTutorialLink.html** to enforce access control

**Usage:**
```javascript
import { checkCategorySubscription, showSubscriptionModal, checkAndBlockContent } from '../studentSubscriptionSystem/subscriptionChecker.js';

// Check if user has subscription for a category
const result = await checkCategorySubscription(db, auth, 'category-id');

if (!result.hasAccess) {
    showSubscriptionModal(result.message, 'subscribe');
}
```

---

## Database Structure

### Subscription Plans
```
subscriptionPlans/
  planId1/
    name: "Basic Package"
    price: 5000
    duration: 30
    description: "Essential tutorials"
    categories: [
      {id: "cat1", name: "Getting Started"},
      {id: "cat2", name: "Advanced"}
    ]
    createdAt: "2024-05-07T..."

  planId2/
    ...
```

### User Subscriptions
```
userSubscriptions/
  userId1/
    planId1/
      userId: "user123"
      planId: "plan1"
      planName: "Basic Package"
      categories: [{id: "cat1", name: "Getting Started"}]
      startDate: "2024-05-07T..."
      endDate: "2024-06-07T..."
      transactionId: "PAY123456"
      paymentMethod: "paystack"
      amount: 5000
      status: "active"
```

---

## Payment Gateway Setup

### Paystack Integration

1. **Get API Keys:**
   - Sign up at https://paystack.com
   - Go to Settings → API Keys & Webhooks
   - Copy your Public Key

2. **Update studentSubscription.html:**
   ```javascript
   // Line ~300: Replace with your Paystack public key
   key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Your public key here
   ```

3. **Enable Webhook:**
   - In Paystack dashboard, set webhook URL to your server
   - Add payment verification logic (optional but recommended)

### Flutterwave Integration

1. **Get API Keys:**
   - Sign up at https://flutterwave.com
   - Go to Settings → API Keys
   - Copy your Public Key

2. **Update studentSubscription.html:**
   ```javascript
   // Line ~320: Replace with your Flutterwave public key
   public_key: 'FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxx-X', // Your public key
   ```

3. **Enable Webhook:**
   - In Flutterwave dashboard, set webhook URL
   - Implement payment verification (optional but recommended)

---

## Integration with Watch Page

### Add to watchTutorialLink.html

1. **Import subscription checker at the top:**
```javascript
import { checkAndBlockContent } from '../studentSubscriptionSystem/subscriptionChecker.js';
```

2. **After loading tutorials, add this check:**
```javascript
// When user clicks to play a tutorial
async function openTutorial(key) {
    const tutorial = window.loadedTutorials?.[key];
    if (!tutorial) return;

    // Check subscription status
    const isAllowed = await checkAndBlockContent(db, auth, tutorial.category, document.body);
    
    if (!isAllowed) return; // Access blocked

    // Continue with normal playback logic
    // ... existing code ...
}
```

3. **Alternative: Block entire grid by category**
```javascript
// In loadTutorials function
async function loadTutorials(category = 'all') {
    // ... existing load code ...
    
    // Check subscription for this category
    if (category !== 'all') {
        const result = await checkCategorySubscription(db, auth, category);
        if (!result.hasAccess) {
            showSubscriptionModal(result.message, 'subscribe');
            return;
        }
    }
    
    // ... continue loading ...
}
```

---

## Features & Workflows

### Admin Workflow
1. Create categories in `tuto_category_manager.html`
2. Create subscription plans grouping those categories
3. Set pricing and duration
4. Plans go live immediately

### Student Workflow
1. Browse available plans
2. Select plan and proceed to payment
3. Payment processed via Paystack/Flutterwave
4. Subscription stored in Firebase
5. Access granted to all categories in plan
6. Access automatically revoked after expiration

### Content Access Control
1. System checks user's subscriptions
2. Compares with tutorial's category
3. Blocks access with modal if no subscription
4. Allows access if subscription is active and not expired

---

## Testing

### Test Credentials

**Paystack Test:**
- Card: 4084 0865 2295 1652
- CVV: 408
- Expiry: Any valid future date

**Flutterwave Test:**
- Card: 5531 8866 5036 0069
- CVV: 564
- Expiry: 09/32

### Test Scenarios

1. **No Subscription:**
   - Try to access content without subscription
   - Should see "Subscription Required" modal

2. **Active Subscription:**
   - Subscribe to a plan
   - Access content in subscribed categories
   - Should see remaining days

3. **Expired Subscription:**
   - Manually edit Firebase `endDate` to past date
   - Try to access content
   - Should see "Subscription Expired" modal

---

## Security Considerations

1. **Firebase Rules:**
```json
{
  "rules": {
    "subscriptionPlans": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "userSubscriptions": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

2. **Payment Verification:**
   - Always verify payment on backend
   - Check transaction status with payment provider
   - Only mark subscription as active after verification

3. **User Validation:**
   - Verify user email matches payment email
   - Check subscription ownership
   - Log all subscription changes

---

## Configuration Checklist

- [ ] Update Paystack public key in studentSubscription.html
- [ ] Update Flutterwave public key in studentSubscription.html
- [ ] Set up payment webhooks in provider dashboards
- [ ] Configure Firebase Realtime Database rules
- [ ] Create admin account in Firebase
- [ ] Test payment flow in test mode
- [ ] Add subscription checks to watchTutorialLink.html
- [ ] Update admin dashboard with link to subscription manager
- [ ] Create student-facing link to subscription portal

---

## Troubleshooting

### Payment Not Processing
- Verify API keys are correct
- Check browser console for errors
- Ensure phone number is in correct format (+234...)
- Check Paystack/Flutterwave account for test mode

### Subscription Not Showing
- Verify Firebase rules allow reads
- Check user authentication status
- Verify subscription end date is in future

### Categories Not Loading
- Check that categories exist in Firebase
- Verify category structure matches expectations
- Check browser console for Firebase errors

---

## Future Enhancements

1. **Subscription Management:**
   - Pause/resume subscriptions
   - Cancel with refund
   - Plan upgrades/downgrades

2. **Admin Features:**
   - Subscription analytics
   - Student management
   - Bulk subscriptions
   - Custom expiration dates

3. **Student Features:**
   - Subscription history
   - Renewal reminders
   - Multiple concurrent subscriptions
   - Family/group plans

4. **Advanced:**
   - Recurring subscriptions
   - Auto-renewal
   - Promo codes
   - Trial periods
