##### Environment Variables

```
PORT=8081
CACHE_TIME=300
SECRET_CAPCHA=reCAPTCHA_v2
DISCORD_WEBHOOK_URL=discord_webhook(channel+token)
DISCORD_BOT_TOKEN=your_token
DISCORD_ID_SERVER=your_discord_server_id
DISCORD_ROLES_ID=string_id,string_id
BASE_IA_URL=your_ia_url
IA_CHAT_ENDPOINT=endpoint_route
PASSWORD_HASH=your_protection_password
AUTHORIZED_DOMAINS=domain,domain
```

-   Cache time is represented in seconds
-   Use -1 in CACHE_TIME to disable cache

##### How to use

Install dependencies

```bash
npm i
```

Generate the transpilation of the TS code to JS using

```bash
npm run build
```

And run the service using

```bash
npm run start
```

<details>
 <summary><code>POST</code> <code><b>/getApiResponse/</b></code> <code>(Send GET request to other API)</code></summary>

`BODY`:

```json
{
  "url": string,
  "headers": json
}
```

`Response`:

> | http code | content-type       | response                      |
> | --------- | ------------------ | ----------------------------- |
> | `200`     | `application/json` | `(JSON API response)`         |
> | `500`     | `application/json` | `{"error": "need more data"}` |
> | `404`     | `application/json` | `{"error": "error message"}`  |

### Remember

These are just the responses that our backend sends. The other answers may depend on the API you are querying.

</details>

---

<details>
 <summary><code>POST</code> <code><b>/postIaChat/</b></code> <code>(GET response from AI API)</code></summary>

`BODY`:

```json
{
  "prompt": string,
  "pass": string,
  "user_id": string
}
```

`Response`:

> | http code | content-type       | response                   |
> | --------- | ------------------ | -------------------------- |
> | `200`     | `application/json` | `text/html; charset=utf-8` |
> | `404`     | `application/json` | `{"error": 404}`           |

</details>

---

<details>
 <summary><code>POST</code> <code><b>/postContact/</b></code> <code>(POST contact form and send to discord webhook)</code></summary>

`BODY`:

```json
{
  "name": string,
  "email": string,
  "reason": string,
  "discord": string | undefined,
  "message": string,
  "captcha": string
}
```

`Response`:

> | http code | content-type       | response                      |
> | --------- | ------------------ | ----------------------------- |
> | `200`     | `text/plain`       | `text/html; charset=utf-8`    |
> | `401`     | `text/plain`       | `Unauthorized`                |
> | `404`     | `application/json` | `{"error": 404}`              |
> | `500`     | `application/json` | `{"error": "need more data"}` |

</details>

---

<details>
 <summary><code>GET</code> <code><b>/getPartnerLogo/:name</b></code> <code>(GET Partner Logo)</code></summary>

`Response`:

> | http code | content-type                  | response                     |
> | --------- | ----------------------------- | ---------------------------- |
> | `200`     | `image/png+jpeg+jpg+gif+webp` | `RAW image file`             |
> | `404`     | `application/json`            | `{"error": "error message"}` |

</details>

---

<details>
 <summary><code>GET</code> <code><b>/getHallOfFame/</b></code> <code>(GET Hall Of Fame from discord roles)</code></summary>

`Response`:

> | http code | content-type       | response                              |
> | --------- | ------------------ | ------------------------------------- |
> | `200`     | `application/json` | `{"response": [discord guild member]` |
> | `404`     | `application/json` | `{"error": 404}`                      |

[Discord Guild Member](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)

</details>
