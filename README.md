Oolvay scaffolding

> [!NOTE]
> Vercel Hobby plans only allow cron jobs to run once per day.  
> During local development or Hobby deployments, use:
>
> ```json
> "schedule": "0 0 * * *"
> ```
>
> In production (Vercel Pro or higher), change this back to once per hour:
>
> ```json
> "schedule": "0 * * * *"
> ```
