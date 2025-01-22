import { isBlank } from './../../../utils/support';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserSerializer } from 'serializers/user';
import OauthAuthenticator, { OAuthParams } from 'services/oauth_authenticator';
import { render400Error, renderJson } from 'utils/render_json';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async() =>{
    const { provider, token, displayName, emojicon } = request.body as OAuthParams;

    if (isBlank(provider) || isBlank(token)) {
      const errorMessage = 'Provider and token are required'
      return render400Error(request, reply, errorMessage)
    }

    else {
      const result = await OauthAuthenticator.call({ provider, token, displayName, emojicon });
      const responseData = UserSerializer.serialize(result.user);

      return reply.send(responseData);
    }

  }, request, reply);
};
