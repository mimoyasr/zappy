# zappy

Zappy integrates with a Slack channel and listens on specific messages. For simplicity, we the tool will listen on all messages containing the word “go”. As soon as any member of the marketing team, places a messages on a channel containing the message “go”, the tool fetches twitter feeds from the FictionFone account and saves in a mongo collection. Lastly, for our demo purpose, you will create a view that fetches tweets from mongoDB and shows in a table.

###Installation 

####Fristly 
the first thing to do is to create a dummy slack and twitter accounts.
create and api appliction and get slack token and twiiter customer key and token 
 you can find it here : 

twiiter : https://apps.twitter.com/
slack : https://api.slack.com/apps/

####secondly  
then you should create a slack out going webhook and use this trigger : 
`a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,?,*,.`

in the url you can run `./ngrock http 8080` and copy paste the url like this 
`http://YOURCODE.ngrok.io/slack/seed`

raname `conf.json.example` to `conf.json` and put all the nessery keys there 

###Runnung
1 `npm install`
2 `npm run build`
3 `npm start`

###Notes:

this project requires a running mongo db demond 



