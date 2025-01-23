// // Select all 'Join Now' buttons
// document.querySelectorAll('.price__btn').forEach(button => {
//     button.addEventListener('click', (event) => {
//       // Get the plan details
//       const planCard = event.target.closest('.price__card');
//       const planName = planCard.querySelector('h4').innerText;
//       const planPrice = planCard.querySelector('h3').innerText;
  
//       // Redirect to a payment page with query parameters
//       const paymentUrl = `payment.html?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(planPrice)}`;
//       window.location.href = paymentUrl;
//     });
//   });
  