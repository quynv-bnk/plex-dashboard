import { DependencyList, EffectCallback, useEffect } from "react";

interface IProps {
    effect: EffectCallback;
    deps?: DependencyList;
}

export function Effect(props: IProps) {
    useEffect(props.effect, props.deps || []);
    return null;
}