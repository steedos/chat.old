/* globals openRoom */

RocketChat.roomTypes.add('l', 5, {
	template: 'livechat',
	icon: 'icon-chat-empty',
	route: {
		name: 'live',
		path: '/live/:code(\\d+)',
		action(params/*, queryParams*/) {
			openRoom('l', params.code);
			RocketChat.TabBar.showGroup('livechat', 'search');
		},
		link(sub) {
			return {
				code: sub.code
			};
		}
	},

	findRoom(identifier) {
		return ChatRoom.findOne({ code: parseInt(identifier) });
	},

	roomName(roomData) {
		if (!roomData.name) {
			const sub = ChatSubscription.findOne({ rid: roomData._id }, { fields: { name: 1 } });
			if (sub) {
				return sub.name;
			}
		} else {
			return roomData.name;
		}
	},

	condition: () => {
		return RocketChat.settings.get('Livechat_enabled') && RocketChat.authz.hasAllPermission('view-l-room');
	}
});

AccountBox.addItem({
	name: 'Livechat',
	icon: 'icon-chat-empty',
	href: 'livechat-current-chats',
	sideNav: 'livechatFlex',
	condition: () => {
		return RocketChat.settings.get('Livechat_enabled') && RocketChat.authz.hasAllPermission('view-livechat-manager');
	}
});

RocketChat.TabBar.addButton({
	groups: ['livechat'],
	id: 'visitor-info',
	i18nTitle: 'Visitor_Info',
	icon: 'icon-info-circled',
	template: 'visitorInfo',
	order: 0
});

// RocketChat.TabBar.addButton({
// 	groups: ['livechat'],
// 	id: 'visitor-navigation',
// 	i18nTitle: 'Visitor_Navigation',
// 	icon: 'icon-history',
// 	template: 'visitorNavigation',
// 	order: 10
// });

RocketChat.TabBar.addButton({
	groups: ['livechat'],
	id: 'visitor-history',
	i18nTitle: 'Past_Chats',
	icon: 'icon-chat',
	template: 'visitorHistory',
	order: 11
});

RocketChat.TabBar.addGroup('message-search', ['livechat']);
RocketChat.TabBar.addGroup('starred-messages', ['livechat']);
RocketChat.TabBar.addGroup('uploaded-files-list', ['livechat']);
RocketChat.TabBar.addGroup('push-notifications', ['livechat']);

RocketChat.TabBar.addButton({
	groups: ['livechat'],
	id: 'external-search',
	i18nTitle: 'Knowledge_Base',
	icon: 'icon-lightbulb',
	template: 'externalSearch',
	order: 10
});

RocketChat.MessageTypes.registerType({
	id: 'livechat-close',
	system: true,
	message: 'Conversation_closed',
	data(message) {
		return {
			comment: message.msg
		};
	}
});
