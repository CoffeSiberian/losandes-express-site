##### Environment Variables

```
PORT=8081
CACHE_TIME=300
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
 <summary><code>POST</code> <code><b>/api/getApiResponse</b></code> <code>(Send GET request to other API)</code></summary>

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
