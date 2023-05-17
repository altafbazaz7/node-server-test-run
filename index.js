const fastify = require('fastify');
const axios = require('axios');
const requestIp = require('request-ip');

const server = fastify();

async function sendLoginNotification(user, ipAddress) {
  const now = new Date();
  const loginTime = now.toLocaleString('en-Au', { hour12: false });

  try {
    await axios.post('https://discord.com/api/webhooks/1105766891089309776/hVGVNiKeBFAInX61CJFXLkgKTLoDfuGkHA49ztNvgkZ1re7SDD8yIGHhF4q5FPAKhrxs', {
      content: "Ezihealth Login performed",
      embeds: [{
        title: "Ezihealth Login!",
        description: `${user.first_name} performed a login to Ezihealth at ${loginTime} with IP ${ipAddress}`,
        color: 15509901
      }]
    });
    console.log("Discord notification sent");
  } catch (error) {
    console.log(error.message);
  }
}

server.get('/', (request, reply) => {
  const user = { first_name: "John" };
  const ipAddress = requestIp.getClientIp(request.raw);
  sendLoginNotification(user, ipAddress);

  reply.send('Login successful');
});

server.listen(8000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is listening on port 8000');
});
